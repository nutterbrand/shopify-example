import React from 'react';
import {
    Button,
    Card,
    Form,
    FormLayout,
    Layout,
    Page,
    SettingToggle,
    Stack,
    TextField,
    TextStyle,
} from '@shopify/polaris';

class AnnotatedLayout extends React.Component {
    state = {
        discount: '10',
        enabled: false,
        description1: "Since 1985 we've been selling the top sprockets in the US.",
        description2: "Shop now and see our latest selection and prices.",
    };

    render() {
        const { discount, enabled } = this.state;
        const contentStatus = enabled ? 'Sign in' : 'Sign out';
        const textStatus = enabled ? 'Sign in' : 'Sign out';
        const adUrl = "www.sprockets.com";
        const headline1 = "Find the best sprockets.";
        const headline2 = "We offer the best selection.";
        const headline3 = "Shop now and get our latest discounts";
        const description1 = "Since 1985 we've been selling the top sprockets in the US.";
        const description2 = "Shop now and see our latest selection and prices.";



        return (
            <Page>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Sign in with Google"
                        description="Sign in with your Google account and select the ads"
                    >
                        <SettingToggle
                            action={{
                                content: contentStatus,
                                onAction: this.handleToggle,
                            }}
                            enabled={enabled}
                        >
                            Your Google account is {' '}
                            <TextStyle variation="strong">{textStatus}</TextStyle>.
                        </SettingToggle>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        title="Sign in with Google"
                        description="Sign in with your Google account and select the ads"
                    >
                        <Card sectioned>
                            <Card.Section>
                                <Card sectioned>
                                    <div>
                                        <div style={{ fontSize: "14px", paddingBottom: "4px" }}>
                                          <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                                            Ad
                                          </span>{" "}
                                            &nbsp;&middot;&nbsp; {adUrl}
                                        </div>
                                        <span
                                            size="small"
                                            style={{ color: "#2200CC", fontSize: "20px" }}
                                        >
                                          {headline1} {headline2}
                                        </span>
                                        <p style={{ paddingTop: "4px" }}>
                                            {description1} {description2}
                                        </p>
                                    </div>
                                </Card>
                                <br />
                                <FormLayout>
                                    <TextField
                                        label="Description"
                                        value={description1}
                                        onChange={ (e) => {
                                            this.setState({
                                                description1: this.state.description1,
                                            });
                                        }}
                                    />
                                    <TextField
                                        label="Extended description"
                                        value={description2}
                                        onChange={ (e) => {
                                            this.setState({
                                                description2: this.state.description2,
                                            });
                                        }}
                                    />
                                </FormLayout>
                            </Card.Section>
                        </Card>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        title="Budget"
                        description="Select a starting budget for your Google Ad campaigns."
                    >
                        <Card sectioned>
                            <Form onSubmit={this.handleSubmit}>
                                <FormLayout>
                                    <TextField
                                        value={discount}
                                        onChange={this.handleChange('discount')}
                                        label="Starting budget"
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
        console.log('submission', this.state);
    };

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };

    handleToggle = () => {
        this.setState(({ enabled }) => {
            return { enabled: !enabled };
        });
    };
}

export default AnnotatedLayout;