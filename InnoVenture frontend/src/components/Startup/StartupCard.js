import React from 'react'
import { FaBuilding, FaStickyNote ,FaRegHandPointUp, FaRupeeSign, FaWeight, FaArrowLeft } from "react-icons/fa";
import {FaHandHoldingDollar} from "react-icons/fa6"
import { LuBadgePercent } from "react-icons/lu";

import "../StartupInfo/StartupInfo.css"

const StartupCard = ({renderChart,startup}) => {
    return (
        <>
        <section id="startup-info" class="startup-info px-5">
    <div class="row ">

            <div class="col-lg-5 d-flex align-items-stretch">
                <div class="info">
                    <div class="card1">
                        <FaBuilding />
                        <h4>Name : </h4>
                        <p>{startup.name} </p>
                    </div>

                    <div class="card1">
                        <FaStickyNote />
                        <h4>Description :</h4>
                        <p>{startup.description}</p>
                    </div>

                    <div class="card1">
                        <FaRegHandPointUp />
                        <h4>USP :</h4>
                        <p>{startup.usp}</p>
                    </div>


                    <div className="row">
                        <div class="card1 col">
                            <LuBadgePercent />
                            <h4>Available Equity : </h4>
                            <p>{startup.availableEquity} % </p>
                        </div>

                        <div class="card1 col">
                            <FaHandHoldingDollar />
                            <h4>Startup Valuation</h4>
                            <p>{startup.valuation}</p>
                        </div>
                    </div>

                </div>

            </div>

            <div class="col-lg-7 mt-5 mt-lg-0">
                <div className="chart">
                    <h4 className="fw-bold mb-3">Sales Data</h4>
                    {
                        startup.data && (
                            <div className="data">
                                <pre>
                                    {renderChart()}
                                </pre>
                            </div>
                        )
                    }


                </div>
            </div>

            </div>

            </section>

        </>
    )
}

export default StartupCard