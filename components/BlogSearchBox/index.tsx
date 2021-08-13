import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { BlogSearchWrapper, SearchInput } from "./BlogSearchBox.styled";

const BlogSearchBox = () => {
  return (
    <BlogSearchWrapper>
      <div className="container">
        <Text fontSize="xxxl" color="white">
            Legal Blog
         </Text>
        <Spacer direction="vertical" size={15} />
        {/*<SearchInput placeholder="What do you want to read about" />*/}
      </div>
    </BlogSearchWrapper>
  );
};

export default BlogSearchBox;
