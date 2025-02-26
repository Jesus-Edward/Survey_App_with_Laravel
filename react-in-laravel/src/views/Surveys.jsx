import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { userStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import Pagination from "../components/Pagination";

export default function Surveys() {

    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = userStateContext();

    const onDeleteClick = (id) => {
        if (window.confirm("About to delete survey, continue?")) {
            axiosClient.delete(`/survey/${id}`)
            .then(() => {
                getSurveys();
                showToast("Survey deleted successfully");
                // window.location.reload();
            });
        }
    };

    const onPageClick = (link) => {
        getSurveys(link.url);
    };

    const getSurveys = (url) => {
        url = url || "/survey"
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setLoading(false);
            setMeta(data.meta);
            setLinks(data.meta.links);
        });
    }

    useEffect(() => {
        getSurveys()
    }, [])

    return (
        <PageComponent title="Surveys" button={(
            <TButton color="indigo" to="/surveys/create">
                <PlusCircleIcon className="h-6 w-6 mr-2" />
                Create new
            </TButton>
        )}>
            {loading && (
                <div className="text-center text-lg">
                    Loading...
                </div>
            )}
            {!loading && (
                <div>
                    {surveys.length === 0 && (<div className="py-8 text-center text-gray-700">You don't any survey created</div>)}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.map((survey) => (
                            <SurveyListItem
                                survey={survey}
                                key={survey.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                    {surveys.length > 0 && (<Pagination meta={meta} links={links} onPageClick={onPageClick}/>)}
                </div>
            )}
        </PageComponent>
    );
}
