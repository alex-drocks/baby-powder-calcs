import React from 'react';
import {AppShell, Navbar, Header, Group, ActionIcon, Stack, Button, Anchor, NumberInput, Footer} from '@mantine/core';
import Link from "next/link";

export default function Layout({children}) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{base: 200}} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <Stack>
              <NumberInput
                defaultValue={800}
                placeholder="Nombre de millilitres par jour"
                label="Quantité que bébé boit par jour en millilitres (ml)"
                required
              />
              <Link href="/" passHref>
                <Button component="a" variant="default">Calcul Prix</Button>
              </Link>
              <Link href="/quantites" passHref>
                <Button component="a" variant="default">Calcul Quantités</Button>
              </Link>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{height: '100%'}} px={20} position="apart">
            <h1 style={{marginTop: 0, marginBottom: 0}}>BébéCalculs</h1>
            <span>
              Calcul des prix et quantités requises pour
              nourrir bébé avec la préparation commerciale.
            </span>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
