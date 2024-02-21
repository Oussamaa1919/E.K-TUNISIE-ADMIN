import TitleCard from "../../../components/Cards/TitleCard"

const userSourceData = [
    {source : "Patisserie", count : "26,345", conversionPercent : 10.2},
    {source : "Boulangerie", count : "21,341", conversionPercent : 11.7},
    {source : "Viennoiserie", count : "34,379", conversionPercent : 12.4},
    {source : "Sec", count : "12,359", conversionPercent : 20.9},
    {source : "Salée", count : "13,481", conversionPercent : 10.3},
    {source : "Apparel-Boisson", count : "12,665", conversionPercent : 11.3},
    {source : "Petit-Déjeuner", count : "13,145", conversionPercent : 12.3},
    {source : "Restaurant", count : "19,345", conversionPercent : 35.3},
    {source : "Epicerie-Fine", count : "13,245", conversionPercent : 12.4},
]

function UserChannels(){
    return(
        <TitleCard title={"Total Vente Par Categorie Produit"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Catégorie</th>
                        <th className="normal-case">Somme</th>
                        <th className="normal-case">Pourcentgae</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return(
                                    <tr key={k}>
                                        <th>{k+1}</th>
                                        <td>{u.source}</td>
                                        <td>{u.count}</td>
                                        <td>{`${u.conversionPercent}%`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels