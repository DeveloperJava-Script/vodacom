import React from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { Container, Title } from "../styles/Common"
import BtnBack from "../components/BtnBack"

export default function Conditions({ navigation }) {
  return (
    <Container>
      <BtnBack navigation={navigation} />
      <Title style={{ paddingHorizontal: 15 }}>Условия доставки</Title>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 14, margin: 0 }}
      >
        <Text style={styles.text}>
          Мы доставляем артезианскую воду с пн-пт с 9.00-22.00, суббота с
          9.00-17.00
        </Text>

        <Text style={styles.text}>
          Исходя из количества уже принятых заявок, Компания может сократить
          время приема заказов. Это связано с большим количеством
          заказов,особенно в акционные дни. Мы постараемся предложить Вам
          ближайший удобный для Вас вариант доставки.
        </Text>

        <Text style={styles.text}>
          В рабочие дни: с 9.00-11.00, с 11.00-13.00, с 13.00- 15.00, с
          15.00-17.00, с 17.00-19.00, с 19.00-22.00
        </Text>

        <Text style={styles.text}>
          По субботам: с 9.00-11.00, с 11.00- 13.00, с 13.00- 15.00, с
          15.00-17.00
        </Text>

        <Text style={styles.text}>
          Заявки на доставку принимаются с понедельника по субботу с 08.00 -
          17.00 и с 08.00 - 13.00 соответственно.
        </Text>

        <Text style={styles.text}>
          Если Вам нужно заказать доставку на время с 9-11 или с 11-13, то
          звонить нужно накануне до 17.00, если на время с 13-15 или с 15-17, то
          звонить можно до 12.00 текущего дня, если на время с 17-19 или с 19
          -22, то можно звонить до 16.00 текущего дня.
        </Text>

        <Text style={styles.text}>
          В будние дни после 16.00 заказы принимаются на следующий день, в
          приложении после 17.00, в субботу после 12.00 на понедельник.
        </Text>

        <Text style={styles.text}>
          В районы - Фомкино, Лисьи горки, Борисов ручей, Череха, Лопатино,
          Клишово, Кирпичи, Ваулино, Писковичи, Загорицы, Долгорепицы, Родина,
          Уграда, Подосье, Неелово, Федоровщина - график доставки по дням и
          интервалам: с 9.00-13.00, 13.00-17.00, 17.00-22.00 дни поставки:
          ВТОРНИК, ЧЕТВЕРГ, СУББОТА. Минимальный заказ воды 19л - 2 бут.
        </Text>

        <Text style={styles.text}>
          Если Вы не успели сделать заявку на текущий день, перезвоните нашим
          менеджерам 444-888, мы постараемся найти для Вас решение — организуем
          доставку на любое другое время удобное для Вас или сообщим , где можно
          купить нашу продукцию самовывозом. Мы предоставим Вам список магазинов
          по г. Пскову.
        </Text>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.thanksText}>
            Спасибо, что выбрали нас в качестве поставщика воды. Наша работа - о
            Вашем здоровье забота!
          </Text>
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 32,
    paddingBottom: 10,
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    color: "#56565F",
    paddingBottom: 3,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
  thanksText: {
    fontSize: 16,
    color: "#2AA6FF",
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
})
