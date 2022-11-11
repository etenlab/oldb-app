import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, withRouter, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { AgGridReact } from "ag-grid-react";
import "./Home.css";

const transformObjectToArray = (object: any): any => {
  let newArray = [];
  for (const [key, value] of Object.entries(object)) {
    console.log({ key, value });
    newArray.push({
      column_name: key,
      progress_bible_language_data: value,
    });
  }
  return newArray;
};

function Diff() {
  const urlParams = new URLSearchParams(window.location.search);
  const rowId = urlParams.get("rowId");
  console.log({ rowId });
  const GET_ROW_DATA_FOR_ID = gql`
    query MyQuery {
      progress_bible_language_details(
        order_by: { id: asc }
        limit: 1000
        where: { id: { _eq: ${parseInt(rowId!)}} }
      ) {
        code_status
        ethnologue_name
        how_to_fix
        id
        is_sign_language
        iso_639_3_code
        language_scope
        language_status
        primary_continent
        primary_country_code
        primary_country_name
        retired_date
        show_active_dialect
        retirement_explanation
        show_active_language
        show_retired_dialect
        show_retired_language
        show_sign_language
        unit_code
        unit_full_name
        unit_name
        unit_type
      }
    }
  `;
  const [columnDefs, setColumnDefs] = useState([
    { field: "column_name" },
    { field: "progress_bible_language_data" },
  ]);

  const { loading, error, data } = useQuery(GET_ROW_DATA_FOR_ID, {
    variables: { language: "english" },
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>openlanguages.io</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <div
          className="ag-theme-alpine"
          style={{ width: "auto", height: "90vh" }}
        >
          <CircleSpinnerOverlay
            loading={loading}
            overlayColor="rgba(0,153,255,0.2)"
          ></CircleSpinnerOverlay>
          <AgGridReact
            rowData={
              data
                ? transformObjectToArray(
                    data.progress_bible_language_details[0]
                  )
                : []
            }
            columnDefs={columnDefs}
          ></AgGridReact>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(Diff);
