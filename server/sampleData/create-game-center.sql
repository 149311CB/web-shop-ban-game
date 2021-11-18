use web-shop-ban-game
db.game_center.insertMany([
    {
        game: "6193b1e98ee567321631b9e2",
        includes:[
            "6193b1e98ee567321631b9e6",
            "6193b1e98ee567321631b9e5"
        ],
        included_in:[
            "6193b1e98ee567321631b9e4",
            "6193b1e98ee567321631b9e3"
        ]
    },
    {
        game: "6193b1e98ee567321631b9e3",
        includes:[
            "6193b1e98ee567321631b9e2",
            "6193b1e98ee567321631b9e5"
        ],
        included_in:[]
    },
    {
        game: "6193b1e98ee567321631b9e4",
        includes:[
            "6193b1e98ee567321631b9e2",
            "6193b1e98ee567321631b9e5",
            "6193b1e98ee567321631b9e6"
        ],
        included_in:[]
    },
    {
        game: "6193b1e98ee567321631b9e5",
        includes:[],
        included_in:[
            "6193b1e98ee567321631b9e2",
            "6193b1e98ee567321631b9e3",
            "6193b1e98ee567321631b9e4"
        ]
    },
    {
        game: "6193b1e98ee567321631b9e6",
        includes:[],
        included_in:[
            "6193b1e98ee567321631b9e2",
            "6193b1e98ee567321631b9e4"
        ]
    }
])