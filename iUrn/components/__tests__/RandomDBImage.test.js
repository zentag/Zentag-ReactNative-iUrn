import RandomImage from "../RandomImage"
import renderer from "react-test-renderer"
import { Image } from "react-native"
describe("Random Image From DB for memory vault", () => {
    it("Renders error image", async () => {
        expect(RandomImage({imgSource:null})).toEqual(<Image testID="error" source={require("../../assets/images/placeholder2.png")}/>)
    })
    it(`renders the same as previously`, () => {
        const tree = renderer.create(<RandomImage imgSource={require("../../assets/images/placeholder.png")}/>).toJSON();
      
        expect(tree).toMatchSnapshot();
      });
})