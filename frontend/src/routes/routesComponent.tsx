import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/inicio/inicio";
import NotFound from "../pages/notFound/notFound";
import Contatos from "../pages/contatos/contatos";

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/contatos" element={<Contatos />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};