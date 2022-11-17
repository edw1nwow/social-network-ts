import React, {ComponentType} from "react";
import Preloader from "../components/Common/Preloader";

type PropsType = {
}

export const withSuspense = (Component:ComponentType) => {

    return (props: PropsType) => {
        return <React.Suspense fallback={<Preloader />} >
         <Component {...props} />
        </React.Suspense>
    };
}
