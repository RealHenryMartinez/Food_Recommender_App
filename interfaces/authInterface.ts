
// Interfaces for the login form state
export interface ICredentials {
	email: Required<string>;
	password: Required<string>;
}
// Interfaces for the create user form state
export interface IUserState extends ICredentials {
	firstName: Required<string>;
	lastName: Required<string>;
}

// Either take in a user who is logging in or creating a new account
export type IDispatchForm = (p: IUserState | ICredentials) => void // Returns the new input of the form