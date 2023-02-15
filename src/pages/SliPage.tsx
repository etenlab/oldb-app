import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import React from "react";


const SliPage: React.FC = () => {
    const router = useIonRouter()


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{ cursor: 'pointer' }} onClick={() => { router.push('/home') }}>openlanguages.io</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonList>
                        <IonItem>
                            <a href="/sli/data">data</a>
                        </IonItem>
                        <IonItem>
                            <a href="/sli/map">map</a>
                        </IonItem>
                    </IonList>

                </IonContent>
            </IonContent>
        </IonPage>
    );

}

export default SliPage;