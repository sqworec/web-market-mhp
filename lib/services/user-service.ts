"use server"

import {db} from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        return  await db.user.findUnique({where: {email}});

    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await db.user.findUnique({where: {id}});
    } catch {
        return null;
    }
};

export const updateUserById = async (id: string, organization: string, payerAndAddress: string, bankAccountNumber: string) => {
    try {
        await db.user.update({
            data: {
                organization,
                payerAndAddress,
                bankAccountNumber
            },
            where: {
                id
            }
        })
    } catch (error) {
        console.error("Error updating user: ", error)
    }
}


