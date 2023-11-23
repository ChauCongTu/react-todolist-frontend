import z from 'zod'

const registerValidate = () => z.object({
    username: z.string().min(5, "Username must contains at least 5 character(s)"),
    password: z.string().min(6, "Password must contains at least 6 character(s)"),
    email: z.string().min(1, "Please input email address").email("Invalid Email"),
    full_name: z.string().min(5, "Full name must contains at least 5 character(s)"),
    date_of_birth: z.string(),
    gender: z.string().min(4, "Please select gender"),
    phone_number: z.string().min(9, "Phone number contains at least 9 numeric").max(11, "Phone number has max 11 numeric"),
    token: z.null(),
    login: z.null(),
});

export default registerValidate