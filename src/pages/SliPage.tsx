import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import React from "react";
import TableIcon from "../assets/table.png";

const SliPage: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{ cursor: "pointer" }}
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
        <IonContent>
          <IonList>
            <IonItem>
              <a href="/sli/data/glottolog-language">data</a>
            </IonItem>
            <IonItem>
              <a href="/sli/map">map</a>
            </IonItem>
          </IonList>
          <img src={TableIcon} alt="Strategic Languages Initiative" />
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default SliPage;
