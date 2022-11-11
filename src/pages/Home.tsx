import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";

import "./Home.css";
import { AgGridReact } from "ag-grid-react";
import { gql, useQuery } from "@apollo/client";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { useHistory, withRouter } from "react-router-dom";

const Home: React.FC = () => {
  const GET_ROW_DATA = gql`
    query MyQuery {
      progress_bible_language_details(order_by: { id: asc }, limit: 1000) {
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

  const columnDefs = [
    { field: "id" },
    { field: "unit_code" },
    { field: "unit_type" },
    { field: "unit_name" },
    { field: "unit_full_name" },
    { field: "ethnologue_name" },
    { field: "iso_639_3_code" },
    { field: "is_sign_language" },
    { field: "code_status" },
    { field: "language_status" },
    { field: "language_scope" },
    { field: "primary_continent" },
    { field: "primary_country_name" },
    { field: "primary_country_code" },
    { field: "retirement_explanation" },
    { field: "how_to_fix" },
    { field: "retired_date" },
    { field: "show_active_language" },
    { field: "show_retired_language" },
    { field: "show_active_dialect" },
    { field: "show_retired_dialect" },
    { field: "show_sign_language" },
  ];
  const { loading, error, data } = useQuery(GET_ROW_DATA, {
    variables: { language: "english" },
  });
  useEffect(() => {}, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error! {error.message}</div>;
  // } else
  const history = useHistory();
  console.log("graphqlData", data);
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
            rowData={data ? data.progress_bible_language_details : []}
            columnDefs={columnDefs}
            pagination={true}
            onRowClicked={(event) => {
              history.push(`/diff?rowId=${event.data.id}`);
              document.location.reload();
            }}
          ></AgGridReact>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
