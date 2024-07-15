/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useMemo, useRef } from "react";
import { useCheckoutEmailUpdateMutation } from "@/checkout/graphql";
import { useDebouncedSubmit } from "@/checkout/hooks/useDebouncedSubmit";
import { useSubmit } from "@/checkout/hooks/useSubmit/useSubmit";
import { isValidEmail } from "@/checkout/lib/utils/common";

interface ICheckoutEmailUpdateFormData {
	email: string;
}

export const useCheckoutEmailUpdate = ({ email }: ICheckoutEmailUpdateFormData) => {
	const [, updateEmail] = useCheckoutEmailUpdateMutation();
	const previousEmail = useRef(email);

	const onSubmit = useSubmit<ICheckoutEmailUpdateFormData, typeof updateEmail>(
		useMemo(
			() => ({
				scope: "checkoutEmailUpdate",
				onSubmit: updateEmail,
				shouldAbort: async ({ formData: { email } }: any) => {
					// @todo we'll use validateField once we fix it because
					// https://github.com/jaredpalmer/formik/issues/1755
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					const isValid = await isValidEmail(email);
					return !isValid;
				},
				parse: ({ languageCode, checkoutId, email }: any) => ({ languageCode, checkoutId, email }),
			}),
			[updateEmail],
		),
	);

	const debouncedSubmit = useDebouncedSubmit(onSubmit);

	useEffect(() => {
		const hasEmailChanged = email !== previousEmail.current;

		if (hasEmailChanged) {
			previousEmail.current = email;
			void debouncedSubmit({ email });
		}
	}, [debouncedSubmit, email]);
};
