import { SideSheet, Spinner, toaster } from 'evergreen-ui';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { TypeOf } from 'zod';

import useTransferCarMutation from '../hooks/transfer-car-mutation';
import { TransferCar } from '../validations';

interface TransferCarProps {
    userList: string[];
    vehicles: string[];
}

export const TransferCarForm: FC<TransferCarProps> = (props: TransferCarProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const transferCarMutation = useTransferCarMutation();

    const form = useFormik<TypeOf<typeof TransferCar>>({
        initialValues: {
            name: props.userList[0],
            plate: props.vehicles[0],
        },
        validate(values) {
            try {
                TransferCar.parse(values)
            } catch (error: any) {
                return error.formErrors.fieldErrors;
            }
        },
        async onSubmit(values) {
            if (isLoading) return;
            setIsLoading(true);
            try {

                const transferCarResult = await transferCarMutation.mutateAsync({
                    name: values.name,
                    plate: values.plate
                });

                const { message } = transferCarResult;

                if (message == "Auto erfolgreich transferiert") {
                    toaster.success(message, { id: 'transfer-car-success' });
                } else {
                    toaster.danger(message, { id: 'transfer-car-error' });
                }
                setIsShown(false);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(true);
                console.log(error);
            }
        }
    });

    const handleClick = async (state: boolean) => {
        if (props.vehicles.length == 0) {
            toaster.danger("Du besitzt noch keine Fahrzeuge", { id: 'transfer-car-error' });
            return;
        }
        setIsShown(state);
    }

    return (
        <>
            <SideSheet
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}
                preventBodyScrolling
            >
                <form onSubmit={form.handleSubmit} className="px-5 bg-gradient-to-t to-[#101726] from-second pt-10 h-full w-full">
                    <div className='text-3xl text-fontwhite font-semibold'>Autos überschreiben</div>
                    <div className='text-gray-300 mt-2'>Wähle ein Auto aus und wem du das Auto überschreiben möchtest</div>
                    <div className="mt-10 flex flex-col">
                        <label className="text-fontwhite">An wen möchtest du dein Auto überschreiben?</label>
                        <select
                            defaultValue={props.userList[0]}
                            id="name"
                            className='mt-2 appearance-none block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        >
                            {props.userList.map((user: string) => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </select>
                        {form.touched.name && form.errors.name && (
                            <p className='text-red mt-1'>{form.errors.name}</p>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col">
                        <label className="text-fontwhite">Welches auto möchtest du überschreiben?</label>
                        <select
                            defaultValue={props.vehicles[0]}
                            className="mb-3 mt-2 appearance-none block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="plate"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        >
                            {props.vehicles.map((vehicle: string) => (
                                <option key={vehicle} value={vehicle}>{vehicle}</option>
                            ))}
                        </select>
                        {form.touched.plate && form.errors.plate && (
                            <p className='text-red mt-1'>{form.errors.plate}</p>
                        )}
                    </div>
                    <button type='submit' onClick={() => handleClick(false)} disabled={isLoading} className="bg-authgreen text-myblue cursor-pointer font-medium px-4 w-full hover:bg-secgreen py-2 rounded-lg mt-5">{isLoading ? <Spinner marginX="auto" size={24}></Spinner> : "Auto überschreiben"}</button>
                </form>
            </SideSheet>
            <button onClick={() => handleClick(true)} className="bg-authgreen text-myblue font-medium px-4 hover:bg-secgreen py-2 rounded-lg mt-5">Autos überschreiben</button>
        </>
    )
}   