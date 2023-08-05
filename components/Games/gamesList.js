const gamesList = [
	{
		title: "All games",
		image: (
			<div className="border rounded-full p-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
					<line x1="13" x2="19" y1="19" y2="13" />
					<line x1="16" x2="20" y1="16" y2="20" />
					<line x1="19" x2="21" y1="21" y2="19" />
					<polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
					<line x1="5" x2="9" y1="14" y2="18" />
					<line x1="7" x2="4" y1="17" y2="20" />
					<line x1="3" x2="5" y1="19" y2="21" />
				</svg>
			</div>
		),
		page: "/",
		pageImage: "/gamesPage/allgames.webp",
		code: undefined,
	},
	{
		title: "Dota 2",
		image: "/games/DOTA.webp",
		page: "/dota2",
		pageImage: "/gamesPage/invoker.png",
		code: "dota2",
	},
	{
		title: "Counter Strike",
		image: "/games/CSGO.webp",
		page: "/csgo",
		pageImage: "/gamesPage/csgo.png",
		code: "csgo",
	},
	{
		title: "League of Legends",
		image: "/games/LOL.webp",
		page: "/lol",
		pageImage: "/gamesPage/yasuo.png",
		code: "lol",
	},
	{
		title: "Valorant",
		image: "/games/VAL.webp",
		page: "/valorant",
		pageImage: "/gamesPage/jett.png",
		code: "valorant",
	},
	{
		title: "King of Glory",
		image: "/games/KOG.webp",
		page: "/kog",
		pageImage: "/gamesPage/kog.png",
		code: "kog",
	},
	{
		title: "LoL Wild Rift",
		image: "/games/WR.webp",
		page: "/lol-wild-rift",
		pageImage: "/gamesPage/ahri.png",
		code: "lol-wild-rift",
	},
	{
		title: "Overwatch",
		image: "/games/OW.webp",
		page: "/ow",
		pageImage: "/gamesPage/overwatch.png",
		code: "ow",
	},
	{
		title: "Rainbow 6 Siege",
		image: "/games/R6.webp",
		page: "/r6siege",
		pageImage: "/gamesPage/r6.png",
		code: "r6siege",
	},
	{
		title: "StarCraft 2",
		image: "/games/SC.webp",
		page: "/starcraft-2",
		pageImage: "/gamesPage/sc2.png",
		code: "starcraft-2",
	},
];

export default gamesList;
