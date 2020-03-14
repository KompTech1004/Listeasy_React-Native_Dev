import React from 'react';
import {
    View, Text, StatusBar, Alert
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import styles from './styles';
import { globalStyles, colors } from '../../constants';
import GradientText from '../../components/GradientText';
import API from '../../api/';
import axios from 'axios';
import { WebView  } from 'react-native-webview'
import moment from 'moment'
import Loading from '../../components/Loading';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            price: 15,
            currency: 'USD',
            approvalUrl: null,
            token: null
        }
    }

    componentDidMount = async () => {
        var userid = this.props.tour.posterid
        var _this = this;
        await API.post('/user/get_tour_fee', {
            userid: userid 
        }).then(result => {
            _this.setState({
                price: result.data.tourfeeinfo.tourfee_value,
                currency: result.data.tourfeeinfo.tourfee_currency
            })
        });
    }

    pressCheckout = async () => {
        const { price, currency } = this.state;
        this.setState({loading: true});
        try {
            let response1 = await axios({
                method: "POST",
                url: "https://api.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic QVdvXzBBUjJveC1kcUdBUTZQRXViZEtEbXFZaXgzMFh3MFlpRnQtSWc4TWx0T0ZwYUdEU3QzSVpiQlZXZTFxQzVvVV9kbVkwcDhfb3N1WEw6RUZMb2JIdk5CekdfdEpfYlBuME9WdVJtV1BJODRmVHBtc0RtMDRsdk1MOTYtVUlMR1VFVm1DelltZ1JndUVKaFRmTlg3LTFpQ3RTUGFjWmU=`
                }
            });
            this.setState({
                token: response1.data.access_token
            });
            try {
                let response2 = await axios({
                    method: "POST",
                    url: "https://api.sandbox.paypal.com/v1/payments/payment",
                    data: {
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal"
                        },
                        "transactions": [{
                            "amount": {
                                "total": price,
                                "currency": currency,
                                "details": {
                                    "subtotal": price,
                                    "tax": "0",
                                    "shipping": "0",
                                    "handling_fee": "0",
                                    "shipping_discount": "0",
                                    "insurance": "0"
                                }
                            }
                        }],
                        "redirect_urls": {
                            "return_url": "https://example.com/return",
                            "cancel_url": "https://example.com/cancel"
                        }
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${response1.data.access_token}`
                    }
                })
                // .then(function (response) {
                //     console.log(response.data);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });
                const { id, links } = response2.data
                let approvalUrl = links.find(data => data.rel == "approval_url")
                console.log('approvalUrl----->', approvalUrl);
                
                this.setState({
                    loading: false,
                    paymentId: id,
                    approvalUrl: approvalUrl.href
                });
            } catch (err) {
                console.log('payment-error----->', err);
            }
        } catch (err) {
            console.log('payment-error----->', err);
        }
    }
    _onLoadEnd = () => {
        this.setState({loading: false});
    }
    _onNavigationStateChange = async (webViewState) => {
        const tourID = this.props.navigation.getParam('tourID', null);
        // alert(tourID);
        const { token } = this.state;
        let props = this.props;
        if (webViewState.url.includes('https://example.com')) {
            this.setState({
                approvalUrl: null,
                loading: true
            });
            let paymentId = this.getQueryParams("paymentId", webViewState.url)
            let PayerID = this.getQueryParams("PayerID", webViewState.url);
            console.log('extract---->',paymentId, PayerID, token);
            try {
                let response1 = await axios({
                    method: 'POST',
                    url: `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
                    data: {
                        payer_id: PayerID 
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('payment-execute----->', response1);
                this.setState({token: null, loading: false});
                // await props.orderTour(props.tour.tourID, moment().format("YYYY-MM-DD HH:mm:ss"));
                await props.orderTour(tourID, moment().format("YYYY-MM-DD HH:mm:ss"));
                props.navigation.navigate("MyTours");
            } catch (err) {
                console.log('payment-error----->', err);
            } 
        }
    }
    getQueryParams = ( params, url ) => {
        let href = url;
        let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
        let queryString = reg.exec(href);
        return queryString ? queryString[1] : null;
    };
    render() {
        if (this.state.loading) {
            return <Loading loadingText={'Loading'} />;
        }
        return (
            <View style={{ flex: 1, paddingBottom: 0 }}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
                <View style={styles.header}>
                    <View style={{ flex: 1, alignITems: 'center', justifyContent: 'center' }}>
                        <Icon name="menu"
                            type="material-community"
                            color={colors.LIGHT_GREEN}
                            underlayColor="transparent"
                            size={32}
                            onPress={() => {
                                this.props.navigation.openDrawer();
                            }}
                        />
                    </View>
                    <View style={{ flex: 6, paddingLeft: 40 }}>
                        <GradientText style={globalStyles.headerTitle}>Checkout</GradientText>
                    </View>
                </View>
                {this.state.approvalUrl ? 
                <WebView source={{ uri: this.state.approvalUrl }}
                style={{ flex: 1 }}
                onLoadEnd={this._onLoadEnd}
                onNavigationStateChange={this._onNavigationStateChange}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={false}/>
                :
                <View style={styles.containerBody}>
                    <View>
                        <Text style={{ fontSize: 25, textAlign: 'center', color: '#fafafa', padding: 20 }}>Tour Price: <Text style={{ fontWeight: 'bold' }}>{this.state.price} CAD</Text></Text>
                        <Button title="Pay Now" onPress={this.pressCheckout} />
                    </View>
                </View>
                }
            </View>

        )
    }
}

export default Checkout