import {formList, useForm} from '@mantine/form';
import {ActionIcon, Box, Button, Group, NumberInput, TextInput} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {MdDelete as DeleteIcon, MdSave as SaveIcon} from 'react-icons/md';
import React, {useEffect, useState} from "react";


const productModel = {
  productName: '',
  gramsPerUnit: 0,
  mlPerUnit: 0,
  price: 0,
  daysProductWillLast: 0,
  monthlyAmountRequired: 0,
  monthlyPrice: 0
}


export default function Calculations() {
  const [savedProducts, setSavedProducts] = useLocalStorage({
    key: 'products',
    defaultValue: [productModel],
  });

  const [dailyDrinkMl, setDailyDrinkMl] = useLocalStorage({
    key: 'dailyDrinkMl',
    defaultValue: 800,
  });

  const [syncLocalStorageProducts, setSyncLocalStorageProducts] = useState(false)

  const form = useForm({
    initialValues: {
      products: formList(savedProducts),
    },
    validate: {
      products: {
        productName: (val) => val.length > 1 ? null : 'Entrez au moins 2 lettres',
        "gramsPerUnit": null,
        "mlPerUnit": null,
        "price": (val) => val > 1 ? null : 'Entrez un prix',
      }
    },
  });

  const updateProduct = (index) => {
    form.setListItem("products", index, form.values.products[index])
    setSyncLocalStorageProducts(true)
  }

  const deleteProduct = (index) => {
    form.removeListItem('products', index)
    setSyncLocalStorageProducts(true)
  }

  const addProduct = () => {
    form.addListItem("products", productModel)
  }

  const handleSubmit = (values) => {
    setSavedProducts(values.products)
  }

  const handleDailyMlChange = (newValue) => setDailyDrinkMl(newValue)

  const mlPerUnit = (index) => form.values.products[index].gramsPerUnit
    ? (form.values.products[index].gramsPerUnit / 8.5) * 60
    : 0

  const daysProductWillLast = (index) => mlPerUnit(index)
    ? mlPerUnit(index) / dailyDrinkMl
    : 0

  const unitsNeededPerMonth = (index) => mlPerUnit(index)
    ? Math.ceil(((365 / 12) * dailyDrinkMl) / mlPerUnit(index))
    : 0

  const monthlyPrice = (index) => unitsNeededPerMonth(index)
    ? form.values.products[index].price * unitsNeededPerMonth(index)
    : 0

  useEffect(() => {
    if (syncLocalStorageProducts) {
      const {products} = form.values
      if (products.length === 0) {
        setSavedProducts([productModel])
        form.addListItem("products", productModel)
      } else {
        setSavedProducts(products)
      }
      setSyncLocalStorageProducts(false)
    }
  }, [form, setSavedProducts, syncLocalStorageProducts])

  return (
    <Box mx="auto">
      <Group>
        <NumberInput
          defaultValue={dailyDrinkMl}
          placeholder="Nombre de millilitres par jour"
          label="Quantité que bébé boit par jour en millilitres (ml)"
          required
          precision={0}
          min={400}
          onChange={handleDailyMlChange}
        />
      </Group>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {
          form.values.products.map((_, index) => (
            <Group key={index} mt="xs" direction="row" align="flex-start">
              <TextInput
                required
                label="Nom du produit"
                placeholder="Produit"
                autoComplete="off"
                sx={{flex: 1, minWidth: 245}}
                {...form.getListInputProps("products", index, 'productName')}
              />
              <NumberInput
                required
                label="Prix unité"
                placeholder="$ / unité"
                hideControls
                min={0}
                precision={2}
                decimalSeparator="."
                sx={{width: "11ch"}}
                {...form.getListInputProps("products", index, 'price')}
              />
              <NumberInput
                label="Grammes unité"
                placeholder="g / unité"
                hideControls
                min={0}
                precision={2}
                decimalSeparator="."
                sx={{width: "11ch"}}
                {...form.getListInputProps("products", index, 'gramsPerUnit')}
              />
              <NumberInput
                label="Millilitres unité"
                placeholder="ml / unité"
                hideControls
                variant="filled"
                readOnly
                sx={{width: "11ch"}}
                value={mlPerUnit(index)}
              />
              <NumberInput
                label="Durée en jours"
                placeholder="Durée"
                hideControls
                variant="filled"
                precision={1}
                readOnly
                decimalSeparator="."
                sx={{width: "11ch"}}
                value={daysProductWillLast(index)}
              />
              <NumberInput
                label="Unités requises par mois"
                placeholder="Qté à acheter par mois"
                hideControls
                variant="filled"
                precision={0}
                readOnly
                value={unitsNeededPerMonth(index)}
              />
              <NumberInput
                label="Prix par mois ($)"
                placeholder="$ mensuel"
                hideControls
                variant="filled"
                precision={2}
                readOnly
                decimalSeparator="."
                sx={{width: "11ch"}}
                value={monthlyPrice(index)}
              />
              <ActionIcon
                mt={31}
                variant="hover"
                color="blue"
                onClick={() => updateProduct(index)}
              >
                <SaveIcon size={20}/>
              </ActionIcon>
              <ActionIcon
                mt={31}
                variant="hover"
                color="blue"
                onClick={() => deleteProduct(index)}
              >
                <DeleteIcon size={20}/>
              </ActionIcon>
            </Group>
          ))
        }

        <Group position="left" mt="md">
          <Button type="submit">
            Enregistrer
          </Button>
          <Button type="button" variant="subtle" onClick={addProduct}>
            + Ajouter un produit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
