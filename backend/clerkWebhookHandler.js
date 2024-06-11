import { Webhook } from "svix";
import bodyParser from "body-parser";
// import express from "express";
import { createUser, updateUser } from "./lib/actions/user.action";

app.post(
    "/api/webhooks",
    // This is a generic method to parse the contents of the payload.
    // Depending on the framework, packages, and configuration, this may be
    // different or not required.
    bodyParser.raw({ type: "application/json" }),
    async function (req, res) {
        // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
        if (!WEBHOOK_SECRET) {
            throw new Error("You need a WEBHOOK_SECRET in your .env");
        }

        // Get the headers and body
        const headers = req.headers;
        const payload = req.body;

        // Get the Svix headers for verification
        const svix_id = headers["svix-id"];
        const svix_timestamp = headers["svix-timestamp"];
        const svix_signature = headers["svix-signature"];

        // If there are no Svix headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response("Error occured -- no svix headers", {
                status: 400,
            });
        }

        // Create a new Svix instance with your secret.
        const wh = new Webhook(WEBHOOK_SECRET);

        let evt;

        // Attempt to verify the incoming webhook
        // If successful, the payload will be available from 'evt'
        // If the verification fails, error out and  return error code
        try {
            evt = wh.verify(payload, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err) {
            console.log("Error verifying webhook:", err.message);
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        // Do something with the payload
        // For this guide, you simply log the payload to the console
        const { id } = evt.data;
        const eventType = evt.type;
        if (eventType === "user.created") {
            const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;
            const user = {
                clerkId: id,
                email: email_addresses[0].email_address,
                // username: username!, /* This means that a username can also be null sometimes:- username: string | null; */
                username: username || null,
                firstName: first_name,
                lastName: last_name,
                photo: image_url,
            };
            const newUser = await createUser(user);
            if (newUser) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userId: newUser._id,
                    },
                });
            }
            // return with the newuser info
            return res.status(200).json({
                success: true,
                message: "User created",
                user: newUser,
            });

            // return NextResponse.json({ message: "OK", user: newUser });
        }

        if (eventType === "user.updated") {
            const { id, image_url, first_name, last_name, username } = evt.data;

            const user = {
                firstName: first_name,
                lastName: last_name,
                username: username || null,
                photo: image_url,
            };

            const updatedUser = await updateUser(id, user);

            return res.status(200).json({
                success: true,
                message: "User updated",
                user: updatedUser,
            });
            // return NextResponse.json({ message: "OK", user: updatedUser });
        }

        /* if (eventType === 'user.deleted') {
            const { id } = evt.data
    
            const deletedUser = await deleteUser(id || '')
    
            return NextResponse.json({ message: 'OK', user: deletedUser })
        } */

        return res.status(200).json({
            success: true,
            message: "Webhook received",
        });
    }
);
