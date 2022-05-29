import crypto from "node:crypto";

const hashPassword = (password: string) => {
	const salt = crypto.randomBytes(16).toString("hex");
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, "sha512")
		.toString("hex");

	return { salt, hash };
};

const verifyPassword = ({
	providedPassword,
	salt,
	hash
}: {
	providedPassword: string;
	salt: string;
	hash: string;
}) => {
	const providedHash = crypto
		.pbkdf2Sync(providedPassword, salt, 1000, 64, "sha512")
		.toString("hex");

	return providedHash === hash;
};

export { hashPassword, verifyPassword };
