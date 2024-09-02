import { Button, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { UserIcon } from "../icons/UserIcon";

export const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const username = data["username"] as string;
        login({
            name: username,
        }).then(() => {
            navigate('/home', { replace: true });
        }).catch(() => {
            setError('username', { type: 'invalid', message: 'Username invalid!' });
        });
    };

    return <>
        <div className="relative">
            <div className="flex justify-center p-8" style={{ paddingTop: '200px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <Controller
                            name="username"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={() => (
                                <Input
                                    aria-label="Username"
                                    radius="md"
                                    placeholder="Username"
                                    variant="bordered"
                                    size="md"
                                    isClearable
                                    startContent={
                                        <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    {...register("username", {
                                        required: 'Username is required.',
                                    })}
                                    errorMessage={errors.username && `${errors.username?.message}`}
                                    validationState={errors.username ? 'invalid' : 'valid'}
                                    isRequired
                                    className="w-72"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Button color="primary" type="submit" className="login-form-button">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    </>
}