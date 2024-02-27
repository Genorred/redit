import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {FieldSpot} from "../widgets/fieldSpot";
import {Spinner} from "../shared/ui/spinner";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/EditableField">
                <h1/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/FieldSpot">
                <FieldSpot/>
            </ComponentPreview>
            <ComponentPreview path="/Spinner">
                <Spinner/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;