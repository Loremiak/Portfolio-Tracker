// trending coins type

type PriceChangePercentage24h = {
	usd: number;
};

type Content = {
	title: string;
	description: string;
};

type Data = {
	price: number;
	price_btc: string;
	price_change_percentage_24h: PriceChangePercentage24h;
	market_cap: string;
	market_cap_btc: string;
	total_volume: string;
	total_volume_btc: string;
	sparkline: string;
	content: Content | null;
};

type Item = {
	id: string;
	coin_id: number;
	name: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	small: string;
	large: string;
	slug: string;
	price_btc: number;
	score: number;
	data: Data;
};

export type Datum = {
	item: Item;
};

export type TrendingCoinsData = {
	coins: Datum[];
};

// global market data

type TotalMarketCap = {
	usd: number;
};

export type GlobalMarketData = {
	active_cryptocurrencies: number;
	upcoming_icos: number;
	ongoing_icos: number;
	ended_icos: number;
	markets: number;
	total_market_cap: TotalMarketCap;
	total_volume: TotalMarketCap;
	market_cap_percentage: TotalMarketCap;
	market_cap_change_percentage_24h_usd: number;
	updated_at: number;
};

export type DataMarket = {
	data: GlobalMarketData;
};

// market data types

type Roi = {
	times: number;
	currency: string;
	percentage: number;
};

export type Coin = {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number | null;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number | null;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	roi: Roi | null;
	last_updated: string;
};

export type Coins = Coin[];

// coin details type

type CoinLinks = {
	homepage: string[];
	whitepaper: string;
	blockchain_site: string[];
	official_forum_url: string[];
	chat_url: string[];
	announcement_url: string[];
	twitter_screen_name: string;
	facebook_username: string;
	bitcointalk_thread_identifier: string | null;
	telegram_channel_identifier: string;
	subreddit_url: string;
	repos_url: {
		github: string[];
		bitbucket: string[];
	};
};

type CoinImage = {
	thumb: string;
	small: string;
	large: string;
};

type MarketData = {
	current_price: {
		eur: number;
		pln: number;
		usd: number;
	};
	total_value_locked: number | null;
	mcap_to_tvl_ratio: number | null;
	fdv_to_tvl_ratio: number | null;
	roi: null;
	ath: {
		eur: number;
		pln: number;
		usd: number;
	};
	ath_change_percentage: {
		eur: number;
		pln: number;
		usd: number;
	};
	market_cap: {
		eur: number;
		pln: number;
		usd: number;
	};
	market_cap_rank: number;
	fully_diluted_valuation: {
		eur: number;
		pln: number;
		usd: number;
	};
	market_cap_fdv_ratio: number;
	total_volume: {
		usd: number;
	};
	high_24h: {
		usd: number;
	};
	low_24h: {
		usd: number;
	};
	price_change_24h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	price_change_percentage_14d: number;
	price_change_percentage_30d: number;
	price_change_percentage_60d: number;
	price_change_percentage_200d: number;
	price_change_percentage_1y: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	price_change_24h_in_currency: {
		usd: number;
	};
	price_change_percentage_1h_in_currency: {
		usd: number;
	};
	price_change_percentage_24h_in_currency: {
		usd: number;
	};
	price_change_percentage_7d_in_currency: {
		usd: number;
	};
	price_change_percentage_14d_in_currency: {
		usd: number;
	};
	price_change_percentage_30d_in_currency: {
		usd: number;
	};
	price_change_percentage_60d_in_currency: {
		usd: number;
	};
	price_change_percentage_200d_in_currency: {
		usd: number;
	};
	price_change_percentage_1y_in_currency: {
		usd: number;
	};
	market_cap_change_24h_in_currency: {
		usd: number;
	};
	market_cap_change_percentage_24h_in_currency: {
		usd: number;
	};
	total_supply: number;
	max_supply: number;
	circulating_supply: number;
	sparkline_7d: {
		price: number[];
	};
	last_updated: string;
};

type CommunityData = {
	facebook_likes: number | null;
	twitter_followers: number;
	reddit_average_posts_48h: number;
	reddit_average_comments_48h: number;
	reddit_subscribers: number;
	reddit_accounts_active_48h: number;
	telegram_channel_user_count: number | null;
};

// type MarketData24h = {
// 	price: number;
// 	volume_24h: number;
// 	percent_change_24h: number;
// };

type StatusUpdate = {
	description: string;
	category: string;
	created_at: string;
	user: string;
	user_title: string;
	pin: boolean;
	project: {
		type: string;
		id: string;
		name: string;
		image: string;
	};
	user_reports: null;
};

export type CoinDetails = {
	id: string;
	symbol: string;
	name: string;
	web_slug: string;
	asset_platform_id: null;
	platforms: {
		[key: string]: string;
	};
	detail_platforms: {
		[key: string]: {
			decimal_place: number | null;
			contract_address: string;
		};
	};
	preview_listing: boolean;
	public_notice: null;
	additional_notices: string[];
	localization: {
		en: string;
		pl: string;
	};
	description: {
		en: string;
	};
	links: CoinLinks;
	image: CoinImage;
	country_origin: string;
	genesis_date: string;
	sentiment_votes_up_percentage: number;
	sentiment_votes_down_percentage: number;
	watchlist_portfolio_users: number;
	market_cap_rank: number;
	market_data: MarketData;
	community_data: CommunityData;
	status_updates: StatusUpdate[];
	last_updated: string;
};

// chart data

export type ChartData = {
	prices: number[][];
	market_caps?: number[][];
	total_volumes?: number[][];
};
