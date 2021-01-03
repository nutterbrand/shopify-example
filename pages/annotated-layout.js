import React from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField,
} from "@shopify/polaris";

class AnnotatedLayout extends React.Component {
  state = {
    discount: "10",
    enabled: false,
  };

  render() {
    const { discount } = this.state;

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Discount"
            description="Select a discount to apply to all the products."
          >
            <Card sectioned>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <TextField
                    value={discount}
                    onChange={this.handleChange("discount")}
                    label="Starting discount"
                    type="discount"
                  />
                  <Stack distribution="trailing">
                    <Button primary submit>
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }

  handleSubmit = () => {
    this.setState({
      discount: this.state.discount,
    });
    console.log("submission", this.state);
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };
}

export default AnnotatedLayout;
