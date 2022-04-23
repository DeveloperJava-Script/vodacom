import styled from "styled-components"

export const ItemTitle = styled.Text`
  color: #56565f;
  font-size: 14px;
  width: 170px;
  font-family: Montserrat-Bold;
`

export const MiniItemBlock = styled.View`
  background-color: #fff;
  width: 70.5px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #2aa6ff;
`

export const ItemPrice = styled.Text`
  background-color: #20c997;
  padding-horizontal: ${props => (props.small ? "4px" : "8px")};
  padding-vertical: 2px;
  border-radius: 5px;
  font-family: Montserrat-SemiBold;
  color: #fff;
  margin-right: ${props => (props.small ? "6px" : "10px")};
  font-size: ${props => (props.small ? "11px" : "14px")};
`

export const ItemBtnWrapperLeft = styled.TouchableOpacity`
  background-color: ${props => (props.small ? "#fff" : "#2AA6FF")};
  height: 100%;
  border-width: 1px;
  border-color: #2aa6ff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

export const ItemBtnWrapperRight = styled.TouchableOpacity`
  background-color: ${props => (props.small ? "#fff" : "#2AA6FF")};
  height: 100%;
  border-width: 1px;
  border-color: #2aa6ff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const ItemAddToCart = styled.TouchableOpacity`
  background-color: ${props => (props.small ? "#fff" : "#2AA6FF")};
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
  padding: ${props => (props.small ? "5.5px 7px" : "6px 21.5px")};
`

export const ItemPlusMinus = styled.Text`
  color: ${props => (props.small ? "#2AA6FF" : "#fff")};
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  padding-horizontal: 10px;
`

export const ItemAmount = styled.Text`
  color: ${props => (props.small ? "#2AA6FF" : "#fff")};
  font-family: Montserrat-Bold;
  text-align: center;
  font-size: 15px;
`

export const ItemPriceSmall = styled.Text`
  color: ${props => (props.small ? "#2AA6FF" : "#fff")};
  text-align: center;
  font-size: 12px;
  margin-top: -6px;
  font-family: Montserrat-Regular;
`
export const ItemPriceOld = styled.Text`
  font-family: Montserrat-SemiBold;
  color: #aaaaae;
  text-decoration: line-through;
`
