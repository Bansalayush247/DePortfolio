import { SlCalender } from "react-icons/sl"
import './Experience.css'
import { useState, useEffect } from "react"

const Experience = ({state}) => {
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    useEffect(() => {
        const { contract } = state;

        const educationDetails = async () => {
            const education = await contract.methods.allEducation().call();
            setEducation(education);
        }
        contract && educationDetails();

    }, [state]);
    useEffect(() => {
        const { contract } = state;

        const experience = async () => {
            const exp = await contract.methods.allExperience().call();
            setExperience(exp);
        }
        contract && experience();

    }, [state]);
    return (
        <section className="exp-section">
            <h1 className="title">Experience & Education </h1>

            <div className="container">

                <div className="education">
                    <h1 className="edu-tittle">Education</h1>
                    {education !== "" && education.map((edu) => {
                        return (
                            <div className="edu-card">
                                <p className="card-text1">
                                    <SlCalender className='icon' /> {edu.date}
                                </p>
                                <h3 className="card-text2">{edu.degree}</h3>
                                <p className="card-text3">{edu.knowledgeAcquired}</p>
                                <p className="card-text4">
                                    {edu.institutionName}
                                </p>
                            </div>
                        )
                    })}


                </div>
                {/* experience */}
                <div className="education">
                    <h1 className="edu-tittle">Experience</h1>
                    {experience !== "" && experience.map((exp) => {
                            return (
                                <div className="edu-card">

                                    <p className="card-text1">
                                        <SlCalender className='icon' /> {exp.date}
                                    </p>
                                    <h3 className="card-text2">{exp.title}</h3>
                                    <p className="card-text3">{exp.description}</p>
                                    <p className="card-text4">
                                        {exp.skills}
                                    </p>
                                </div>
                                )
                        })}
                </div>
                </div>
        </section>
    )
}

export default Experience
