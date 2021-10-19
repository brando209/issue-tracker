import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    userName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords do not match')
});

export const LoginSchema = Yup.object().shape({
    userName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});

export const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    newPassword: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
})

export const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Too Short!")
        .max(30, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(3, "Too Short!")
        .max(512, "Too Long!")
        .required("Required")
});

export const IssueSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Too Short!")
        .max(30, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(3, "Too Short!")
        .max(512, "Too Long!")
        .required("Required")
});