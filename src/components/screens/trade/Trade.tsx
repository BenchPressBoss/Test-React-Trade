interface TradeProps {
	isAdmin: boolean;
}

function Trade({ isAdmin }: TradeProps) {
	return <>{isAdmin ? <>admin</> : <>user</>}</>
}

export default Trade;