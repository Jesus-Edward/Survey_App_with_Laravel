import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicViews() {

    const answer = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({
        questions: [] // to solve the cannot read property of undefined 'map', you can either give question
                    // a default value in the useState to be an empty array or you can make a check to see if question
                    // exist while iterating ove the question array. But i used both of them.
    });
    const [loading, setLoading] = useState(false);
    const {slug} = useParams();

    function answerChanged(question, value)
    {
        answer[question.id] = value;
        console.log(question, value);

    }

    function onSubmit(ev)
    {
        ev.preventDefault();

        axiosClient.post(`/survey/${survey.id}/answer`, {
            answer,
        })
            .then((response) => {
                debugger;
                setSurveyFinished(true);
            });

    }

    useEffect(() => {
        setLoading(true)
        axiosClient.get(`/survey/get-by-slug/${slug}`)
            .then(({data}) => {
                setLoading(false)
                setSurvey(data.data);
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])
    return (
        <div>
            {loading && (
                <div className="flex justify-center font-bold">Loading...</div>
            )}

            {!loading && (
                <form onSubmit={(ev) => onSubmit(ev)} className="container mx-auto">
                    <div className="grid grid-cols-6">
                        <div className="mr-4 mt-2">
                            <img src={survey.image_url} alt="" />
                        </div>
                        <div className="col-span-5">
                            <h1 className="text-xl mb-3">{survey.title}</h1>
                            <p className="text-gray-500 text-sm mb-3">Expiry Date: {survey.expiry_date}</p>
                            <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
                        </div>
                    </div>

                    {surveyFinished && (
                        <div className="py-4 px-4 bg-emerald-500 text-white w-[600px] mx-auto mt-2">
                            Thank you for participating in the survey!
                        </div>
                    )}

                    {!surveyFinished && (
                        <>
                            <div>
                                {survey.questions &&
                                    survey.questions.map((question, index) => (
                                        <PublicQuestionView
                                            key={question.id}
                                            question={question}
                                            index={index}
                                            answerChanged={val => answerChanged(question, val)}

                                        />
                                    ))}
                            </div>

                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent
                                    shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </>
                    )}

                </form>
            )}
        </div>
    );
}
