import { useNavigate, useParams } from "react-router";
import Item from "./item";

function Pokemon() {
    const navigate = useNavigate();
    const params = useParams();
    return (
        <div>
            <button onClick={()=>navigate(-1)}>Back</button>
            <h3>Pokemon</h3>
            <Item path={['pokemon', params.id]} fields={[
                'name',
                'sprites.front_default',
                'sprites.front_shiny',
                'sprites.back_default',
                'sprites.back_shiny',
                'height',
                'weight',
                'order',
                'abilities.0.ability.name',
                'moves.0.move.name'
                ]}/>
            <h3>Characteristics</h3>
                <Item path={['characteristic', params.id]} fields={[
                'descriptions.0.description'
                ]}/>
            <h3>Abilities</h3>
            <Item path={['ability', params.id]} fields={[
                'effect_entries.0.effect',
                'flavor_text_entries.0.flavor_text'
                ]}/>
        </div>
    );
}

export default Pokemon;
