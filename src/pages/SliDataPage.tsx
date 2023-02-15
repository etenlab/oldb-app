import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import React from "react";


const SliDataPage: React.FC = () => {
    const router = useIonRouter()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{cursor: 'pointer'}} onClick={() => {router.push('/home')}}>openlanguages.io</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonText>SLI Data</IonText>

                </IonContent>
            </IonContent>
        </IonPage>
    );

}

export default SliDataPage;