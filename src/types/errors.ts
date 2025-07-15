export enum PaymentErrorCodes {
  InputError = 'input_error',
  UserRejected = 'user_rejected',
  PaymentRejected = 'payment_rejected',
  InvalidReceiver = 'invalid_receiver',
  InsufficientBalance = 'insufficient_balance',
  TransactionFailed = 'transaction_failed',
  GenericError = 'generic_error',
  UserBlocked = 'user_blocked',
}


export enum InstallErrorCodes {
  Unknown = 'unknown',
  AlreadyInstalled = 'already_installed',
  OutsideOfSporranApp = 'outside_of_sporran_app',
  NotOnClient = 'not_on_client',
  AppOutOfDate = 'app_out_of_date',
}

export const InstallErrorMessage = {
  [InstallErrorCodes.Unknown]: 'Failed to install Sporran Sdk.',
  [InstallErrorCodes.AlreadyInstalled]: 'Sporran SDK is already installed.',
  [InstallErrorCodes.OutsideOfSporranApp]:
    'MiniApp launched outside of SporranApp.',
  [InstallErrorCodes.NotOnClient]: 'Window object is not available.',
  [InstallErrorCodes.AppOutOfDate]:
    'SporranApp is out of date. Please update the app.',
};