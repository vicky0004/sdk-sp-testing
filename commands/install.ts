import { sporranSDK } from "../index";
import { init } from "../commandAsync/init";
import { InstallErrorCodes, InstallErrorMessage } from "../types/errors";
import { InstallReturnType } from "../types/payloads";

export async function install(appId: string): Promise<InstallReturnType> {
    // Check if already installed
    if (typeof window === 'undefined' || Boolean(window.sporranSDK)) {
        return {
            success: false,
            errorCode: InstallErrorCodes.AlreadyInstalled,
            errorMessage: InstallErrorMessage[InstallErrorCodes.AlreadyInstalled],
        };
    }

    // Validate environment
    if (!window.SporranApp) {
        return {
            success: false,
            errorCode: InstallErrorCodes.OutsideOfSporranApp,
            errorMessage: InstallErrorMessage[InstallErrorCodes.OutsideOfSporranApp],
        };
    }

    // Set app ID with validation
    if (appId) {
        if (typeof appId !== 'string' || appId.trim().length === 0) {
            console.warn('Invalid app ID provided during install');
        } else {
            sporranSDK.appId = appId.trim();
        }
    } else {
        console.warn('App ID not provided during install');
    }

    try {

        // Initialize device properties
        sporranSDK.deviceProperties = {
            deviceOS: window.SporranApp.device_os ?? 'unknown',
            SporranAppVersion: window.SporranApp.version ?? 0,
        };
        window.sporranSDK = sporranSDK;
        const initResult = await init(appId);
        if (initResult?.status !== 'success') {
            console.error('Init failed:', initResult);
            return {
                success: false,
                errorCode: InstallErrorCodes.Unknown,
                errorMessage: 'sporran sdk initialization failed with status: ' + initResult?.status,
            };
        }

        sporranSDK.isReady = true;
        return { success: true, initResult: initResult };
    } catch (error) {
        alert(error);
        return {
            success: false,
            errorCode: InstallErrorCodes.Unknown,
            errorMessage: InstallErrorMessage[InstallErrorCodes.Unknown],
        };
    }
}