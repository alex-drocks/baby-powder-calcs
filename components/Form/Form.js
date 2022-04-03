import {formList, useForm} from '@mantine/form';
import {TextInput, Button, Group, Box, NumberInput, ActionIcon, Center} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {Trash} from 'tabler-icons-react';


export default function Form() {
  const [savedProducts, setSavedProducts] = useLocalStorage({
    key: 'products', defaultValue: [
      {
        productName: '',
        unit: {
          grams: 0,
          ml: 0,
          price: 0,
        }
      }
    ]
  });

  const form = useForm({
    initialValues: {
      products: formList(savedProducts),
    },

    validate: {
      products: {
        productName: (val) => val.length > 1 ? null : 'Entrez au moins 2 lettres',
        "unit.grams": null,
        "unit.ml": null,
        "unit.price": (val) => val > 1 ? null : 'Entrez un prix',
      }
    },
  });

  const addProduct = (product) => form.addListItem('products', product)

  const handleSubmit = (values) => {
    console.log(values)
    addProduct(values)
    setSavedProducts(values.products)
  }

  const deleteProduct = (id) => form.removeListItem('products', id)


  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {
          form.values.products.map((_, index) => (
            <Group key={index} mt="xs">
              <TextInput
                required
                label="Nom du produit"
                placeholder="Produit"
                autoFocus
                {...form.getListInputProps("products", index, 'productName')}
              />
              <NumberInput
                label="Grammes par unité"
                placeholder="g / unité"
                hideControls
                {...form.getListInputProps("products", index, 'unit.grams')}
              />
              <NumberInput
                label="Millilitres par unité"
                placeholder="ml / unité"
                hideControls
                {...form.getListInputProps("products", index, 'unit.ml')}
              />
              <NumberInput
                required
                label="Prix par unité"
                placeholder="$ / unité"
                hideControls
                min={0}
                precision={2}
                decimalSeparator="."
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`
                    : '$ '
                }
                {...form.getListInputProps("products", index, 'unit.price')}
              />
              <ActionIcon
                variant="hover"
                onClick={() => deleteProduct(index)}
              >
                <Trash size={18}/>
              </ActionIcon>
            </Group>
          ))
        }

        <Group position="left" mt="md">
          <Button type="submit">
            Ajouter un produit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
