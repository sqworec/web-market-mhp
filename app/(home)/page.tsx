import Navbar from "@/app/(home)/_components/navbar";
import {getUserById} from "@/lib/services/user-service";
import {log} from "node:util";

const HomePage = async()  => {

    const user = await getUserById(1)
    console.log("dsfdsf")

    return (
        <>
            <Navbar/>
            {user?.fullName}
        </>
    );
}

export default HomePage;