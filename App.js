import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryScreen from './src/screens/TelaInventario';
import AddProductScreen from './src/screens/TelaAdicionarProduto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Estoque de Tintas' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Cadastrar Tinta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
