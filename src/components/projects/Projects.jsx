import React, { useState, useEffect } from 'react'
import { FaDonate } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, Row, Button } from "reactstrap"
import "./Projects.css"

const Projects = ({ state }) => {
    const [modal, setModal] = useState(false);
    const [projects, setProjects] = useState("");
    const donateETH = async (event) => {
        event.preventDefault();
        try {
            const { contract, web3 } = state;
            const eth = document.querySelector("#eth").value;
            const weiValue = web3.utils.toWei(eth, "ether");
            const accounts = await web3.eth.getAccounts();
            await contract.methods.donate().send({ form: accounts[0], value: weiValue, gas: 480000 });
            alert("Transaction Successful");
        }
        catch (error) {
            alert("Transaction Not Successful");

        }
    }
    useEffect(() => {
        const { contract } = state;
        const projectDetails = async () => {
            const projects = await contract.methods.allProjects().call();
            setProjects(projects)
        }
        contract && projectDetails();
    }, [state]);
    return (
        <section className="project-section">
            <h1 className="title">Projects </h1>
            <div className="card-wrapper">
                {projects !== "" && projects.map((project) => {
                    const githubLink = `https://github.com/Bansalayush247/${project.githublink}`;
                    return (<a href={githubLink} className="project-card" target='_blank' rel="noopener noreferrer" >
                        <div className="card-img">
                            <img src={`https://gateway.pinata.cloud/ipfs/${project.image}`} alt="" /></div>
                        <div className="card-text">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                    </a>)
                })}

            </div>
            {/*  =========popup bootstrap==========  */}

            <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>
                    Enter the ETH you want to donate!
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={donateETH}>
                        <Row>
                            <input id="eth" type="text" />
                            <Button className='mt-4' >
                                Send
                            </Button>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
            {/*  =========popup bootstrap end==========  */}
            <p className='donate' onClick={() => setModal(true)}>Liked the Projects ? Consider donating Eth <FaDonate className='icon' /></p>
        </section>
    )
}

export default Projects
