export const apiErrorMessages = {
	somethingWentWrong: "Sorry, something went wrong. Please try again in a moment.",
	requestPasswordResetEmailNotFoundError: "User with provided email has not been found",
	requestPasswordResetEmailInactiveError: "User account with provided email is inactive",
	checkoutShippingUpdateCountryAreaRequiredError: "Please select country area for shipping address",
	checkoutBillingUpdateCountryAreaRequiredError: "Please select country area for billing address",
	checkoutFinalizePasswordRequiredError: "Please set user password before finalizing checkout",
	checkoutEmailUpdateEmailInvalidError: "Provided email is invalid",
	checkoutAddPromoCodePromoCodeInvalidError: "Invalid promo code provided",
	checkoutAddPromoCodePromoCodeVoucherNotApplicableError: "Provided promo code not applicable to this order",
	userAddressUpdatePostalCodeInvalidError: "Invalid postal code provided to address form",
	userAddressCreatePostalCodeInvalidError: "Invalid postal code provided to address form",
	userRegisterPasswordPasswordTooShortError: "Provided password is too short",
	checkoutPayShippingMethodNotSetError: "Please choose delivery method before finalizing checkout",
	checkoutEmailUpdateEmailRequiredError: "Email cannot be empty",
	checkoutPayTotalAmountMismatchError: "Couldn't finalize checkout, please try again",
	checkoutPayEmailNotSetError: "Please fill in email before finalizing checkout",
	userRegisterEmailUniqueError: "Cannot create account with email that is already used",
	loginEmailInactiveError: "Account with provided email is inactive",
	loginEmailNotFoundError: "Account with provided email was not found",
	loginEmailAccountNotConfirmedError: "Account hasn't been confirmed",
	resetPasswordPasswordPasswordTooShortError: "Provided password is too short",
	resetPasswordTokenInvalidError: "Provided reset password token is expired or invalid",
	checkoutLinesUpdateQuantityQuantityGreaterThanLimitError:
		"Couldn't update line - buy limit for this item exceeded",
	checkoutLinesUpdateQuantityInsufficientStockError: "Couldn't update line - insufficient stock in warehouse",
	signInEmailInvalidCredentialsError: "Invalid credentials provided to login",
	signInEmailInactiveError: "The account you're trying to sign in to is inactive",
	checkoutShippingUpdatePostalCodeInvalidError: "Invalid postal code was provided for shipping address",
	checkoutShippingUpdatePhoneInvalidError: "Invalid phone number was provided for shipping address",
	checkoutBillingUpdatePostalCodeInvalidError: "Invalid postal code was provided for billing address",
	checkoutDeliveryMethodUpdatePostalCodeInvalidError: "Invalid postal code was provided for shipping address",
	checkoutDeliveryMethodUpdatePromoCodeInvalidError: "Please provide a valid discount code.",
};