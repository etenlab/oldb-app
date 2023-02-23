import {IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, useIonRouter} from "@ionic/react";
import React from "react";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {GridTable} from "../components/table/GridTable";

const SliDataPage: React.FC = () => {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            router.push("/home");
                        }}
                    >
                        openlanguages.io
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonText>SLI Data</IonText>
                <IonContent style={{height: "88vh", width: "95vw", marginLeft: 40}}>
                    <GridTable/>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default SliDataPage;
