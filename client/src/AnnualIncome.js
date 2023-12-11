// import React, { useState, useEffect } from 'react';

// // // const AnnualIncomeCalculator = () => {
// // //     const [selectedType, setSelectedType] = useState('');
// // //     const [annualIncome, setAnnualIncome] = useState(null);
// // //     const [loading, setLoading] = useState(false);

// // //     const handleTypeChange = (event) => {
// // //         setSelectedType(event.target.value);
// // //     };

// // //     const handleCalculateClick = async () => {
// // //         try {
// // //             setLoading(true);
// // //             const response = await fetch(`http://localhost:9000/annual-income/${selectedType}`);
// // //             const data = await response.json();
// // //             setAnnualIncome(data.annualIncome);
// // //         } catch (error) {
// // //             console.error('Error fetching annual income:', error);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     return (
// // //         <div
// // //             style={{
// // //                 display: 'flex',
// // //                 flexDirection: 'column',
// // //                 alignItems: 'center',
// // //                 justifyContent: 'center',
// // //                 height: '100vh',
// // //             }}
// // //         >
// // //             <h2>Owner Annual Income</h2>
// // //             <label>
// // //                 Select Property Type:
// // //                 <select value={selectedType} onChange={handleTypeChange}>
// // //                     <option value="">Select Type</option>
// // //                     <option value="rent">Rent</option>
// // //                     <option value="buy">Buy</option>
// // //                     <option value="sharedaccommodation">sharedaccommodation</option>
// // //                     <option value="serviceapartments">serviceapartments</option>
// // //                     <option value="commercial">commercial</option>
// // //                     <option value="specific">specific</option>
// // //                 </select>
// // //             </label>
// // //             <button
// // //                 style={{ marginTop: '10px' }}
// // //                 onClick={handleCalculateClick}
// // //                 disabled={!selectedType || loading}
// // //             >
// // //                 Calculate Annual Income
// // //             </button>
// // //             {loading && <p style={{ marginTop: '10px' }}>Loading...</p>}
// // //             {annualIncome !== null && (
// // //                 <div>
// // //                     <p style={{ marginTop: '10px' }}>Annual Income: ${annualIncome}</p>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export defaimport React, { useState, useEffect } from 'react';

// // const AnnualIncomeCalculator = () => {
// //     const [annualIncome, setAnnualIncome] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const [username, setUsername] = useState(localStorage.getItem('username') || '');

// //     useEffect(() => {
// //         // Check if the username is available, otherwise redirect or show an error
// //         if (!username) {
// //             console.error('Username not found');
// //             // Redirect to login or show error
// //         }
// //     }, [username]);

// //     const handleCalculateClick = async () => {
// //         try {
// //             setLoading(true);
// //             console.log("anual",username);
// //             const response = await fetch(`http://localhost:9000/annual-income/${username}`);
// //             const data = await response.json();
// //             setAnnualIncome(data.annualIncome);
// //         } catch (error) {
// //             console.error('Error fetching annual income:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div
// //             style={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 height: '100vh',
// //             }}
// //         >
// //             <h2>Owner Annual Income</h2>
// //             <button
// //                 style={{ marginTop: '10px' }}
// //                 onClick={handleCalculateClick}
// //                 disabled={loading}
// //             >
// //                 Calculate Annual Income
// //             </button>
// //             {loading && <p style={{ marginTop: '10px' }}>Loading...</p>}
// //             {annualIncome !== null && (
// //                 <div>
// //                     <p style={{ marginTop: '10px' }}>Annual Income: ${annualIncome}</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default AnnualIncomeCalculator;
// const AnnualIncomeCalculator = () => {
//     const [annualIncome, setAnnualIncome] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [userUsername, setUserUsername] = useState(localStorage.getItem('userUsername') || '');
//     console.log("userUsername",userUsername);

//     useEffect(() => {
//         // Check if the userUsername is available, otherwise redirect or show an error
//         if (!userUsername) {
//             console.error('Username not found');
//             // Redirect to login or show error
//         }
//     }, [userUsername]);

//     const handleCalculateClick = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`http://localhost:9000/annual-income/${encodeURIComponent(userUsername)}`);
//             if (!response.ok) {
//                 throw new Error('Problem fetching annual income');
//             }
//             const data = await response.json();
//             setAnnualIncome(data.annualIncome);
//         } catch (error) {
//             console.error('Error fetching annual income:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100vh',
//             }}
//         >
//             <h2>Owner Annual Income</h2>
//             <button
//                 style={{ marginTop: '10px' }}
//                 onClick={handleCalculateClick}
//                 disabled={loading}
//             >
//                 Calculate Annual Income
//             </button>
//             {loading && <p style={{ marginTop: '10px' }}>Loading...</p>}
//             {annualIncome !== null && (
//                 <div>
//                     <p style={{ marginTop: '10px' }}>Annual Income: ${annualIncome}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AnnualIncomeCalculator;


import React, { useState } from 'react';

const AnnualIncomeCalculator = () => {
    const [selectedType, setSelectedType] = useState('');
    const [annualIncome, setAnnualIncome] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleCalculateClick = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:9000/annual-income/${selectedType}`);
            const data = await response.json();
            setAnnualIncome(data.annualIncome);
        } catch (error) {
            console.error('Error fetching annual income:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <h2>Owner Annual Income</h2>
            <label>
                Select Property Type:
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="">Select Type</option>
                    <option value="rent">Rent</option>
                    <option value="buy">Buy</option>
                    <option value="sharedaccommodation">sharedaccommodation</option>
                    <option value="serviceapartments">serviceapartments</option>
                    <option value="commercial">commercial</option>
                    <option value="specific">specific</option>
                </select>
            </label>
            <button
                style={{ marginTop: '10px' }}
                onClick={handleCalculateClick}
                disabled={!selectedType || loading}
            >
                Calculate Annual Income
            </button>
            {loading && <p style={{ marginTop: '10px' }}>Loading...</p>}
            {annualIncome !== null && (
                <div>
                    <p style={{ marginTop: '10px' }}>Annual Income: ${annualIncome}</p>
                </div>
            )}
        </div>
    );
};

export default AnnualIncomeCalculator;

