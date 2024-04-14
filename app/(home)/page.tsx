import {getProducts} from "@/actions/get-products";
import * as React from "react"
import {db} from "@/lib/db";
import Container from "@/app/container";

export default async function HomePage() {

    return (
        <>
            <div>
                <video
                    className="w-[100%] h-[100%]"
                    src="https://www.minskhleb.by/upload/iblock/8ec/8ecedb7a6a827bc3d83071cd17e36aef.mp4"
                    autoPlay
                    loop
                >
                </video>
            </div>
        </>
    )
}
