/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Suspense } from 'react';
import { getById } from '@/checkout/lib/utils/common';
import { AddressSectionSkeleton } from '@/checkout/components/AddressSectionSkeleton';
import { UserAddressSectionContainer } from '@/checkout/sections/UserAddressSectionContainer';
import { useUserShippingAddressForm } from '@/checkout/sections/UserShippingAddressSection/useUserShippingAddressForm';
import { AddressCreateForm } from '@/checkout/sections/AddressCreateForm';
import { AddressEditForm } from '@/checkout/sections/AddressEditForm';
import { AddressList } from '@/checkout/sections/AddressList/AddressList';
import { type AddressFragment } from '@/checkout/graphql';
import { useCheckoutFormValidationTrigger } from '@/checkout/hooks/useCheckoutFormValidationTrigger';
import { useAvailableShippingCountries } from '@/checkout/hooks/useAvailableShippingCountries';

interface IUserShippingAddressSectionProps {}

export const UserShippingAddressSection: React.FC<IUserShippingAddressSectionProps> = ({}) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { availableShippingCountries } = useAvailableShippingCountries();
	const {
		form,
		userAddressActions: { onAddressCreateSuccess, onAddressDeleteSuccess, onAddressUpdateSuccess },
	} = useUserShippingAddressForm();

	useCheckoutFormValidationTrigger({
		scope: 'shippingAddress',
		form: form,
	});

	return (
		<Suspense fallback={<AddressSectionSkeleton />}>
			<UserAddressSectionContainer>
				{({
					displayAddressCreate,
					displayAddressEdit,
					displayAddressList,
					setDisplayAddressCreate,
					setDisplayAddressEdit,
					editedAddressId,
				}: any) => (
					<>
						{displayAddressCreate && (
							<AddressCreateForm
								availableCountries={availableShippingCountries}
								onClose={() => setDisplayAddressCreate(false)}
								onSuccess={onAddressCreateSuccess}
							/>
						)}

						{displayAddressEdit && (
							<AddressEditForm
								availableCountries={availableShippingCountries}
								title="Shipping address"
								onClose={() => setDisplayAddressEdit()}
								// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
								address={form.values.addressList.find(getById(editedAddressId)) as AddressFragment}
								onUpdate={onAddressUpdateSuccess}
								onDelete={onAddressDeleteSuccess}
							/>
						)}

						{displayAddressList && (
							<AddressList
								onEditChange={setDisplayAddressEdit}
								onAddAddressClick={() => setDisplayAddressCreate(true)}
								title="Shipping address"
								checkAddressAvailability={true}
								form={form}
							/>
						)}
					</>
				)}
			</UserAddressSectionContainer>
		</Suspense>
	);
};
