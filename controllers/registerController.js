import userModel from "../models/userModel.js"

export const registerController = async (req, res) => {
    try {
        const { name, email, description, password, status  } = req.body

        // validation
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email_id is Required' })
        }
        if (!description) {
            return res.send({ message: 'Description is Required'})
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!status) {
            return res.send({ message: 'Status is Required' })
        }
        //check user
        const existingUser = await userModel.findOne({ email })
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register please login',
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({ name, email, description,status, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: "user Register successfully",
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        })
    }
}