import { Summary } from "../summary";
import { TransactionsTble } from "../TransactionsTble";
import { Container } from "./styles";



export function Dashboard() {

    return (
        <Container>
            <Summary />
            <TransactionsTble />
        </Container>
    )
}
