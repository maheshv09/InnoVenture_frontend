import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './Site2.css';
const equity = {
    name: "TechCorp Inc.",
    industry: "Technology",
    ceo: "Jane Doe",
    trends: [
      { month: "Jan", value: 120 },
      { month: "Feb", value: 210 },
      { month: "Mar", value: 180 },
      { month: "Apr", value: 250 },
      // ... more monthly data
    ],
    investors: [
      "Investor A",
      "Investor B",
      "Venture Capital XYZ",
      "Equity Fund 123",
      // ... more investors
    ]
  };
  
const EquityProfile = ({  }) => {
  // Example data for the graph
  const data = [
 
      { "name": "Jan", "uv": 378, "pv": 2828, "amt": 2103 },
      { "name": "Feb", "uv": 156, "pv": 1591, "amt": 1606 },
      { "name": "Mar", "uv": 224, "pv": 2764, "amt": 2398 },
      { "name": "Apr", "uv": 248, "pv": 1722, "amt": 1730 },
      { "name": "May", "uv": 135, "pv": 2457, "amt": 2861 },
      { "name": "Jun", "uv": 258, "pv": 1970, "amt": 2841 },
      { "name": "Jul", "uv": 200, "pv": 1067, "amt": 2823 },
      { "name": "Aug", "uv": 133, "pv": 2995, "amt": 1878 },
      { "name": "Sep", "uv": 249, "pv": 1861, "amt": 1660 },
      { "name": "Oct", "uv": 267, "pv": 1549, "amt": 2140 },
      { "name": "Nov", "uv": 421, "pv": 1679, "amt": 2611 },
      { "name": "Dec", "uv": 303, "pv": 2100, "amt": 1867 }
  
  
    // ...more data
  ];

  return (
    <div className="equity-profile">
      <h1 className="equity-title">{equity.name}</h1>
      <div className="equity-details">
        <p><strong>Industry:</strong> {equity.industry}</p>
        <p><strong>CEO:</strong> {equity.ceo}</p>
        {/* ... more details ... */}
      </div>
      <table width="100%">
        <tr>
        <th width="50%">        <h2>Market History</h2></th>
        <th>        <h2>Top Investors</h2></th>
        </tr>
        <tr>
          <td>
          <div className="equity-trends">
        <LineChart width={600} height={300} data={data} >
          <Line type="monotone" dataKey="uv" stroke="#3f0afe"  color="fire"/>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
          </td>
          <td>
          <div className="equity-investors">
        <ul>
          {equity.investors.map((investor, index) => (
            <li key={index} className="investor-name">{investor}</li>
          ))}
        </ul>
      </div>
          </td>
        </tr>
   
      </table>
   

     
    </div>
  );
};

export default EquityProfile;
