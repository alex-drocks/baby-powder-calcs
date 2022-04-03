import React from 'react';
import {Container, Group, Header} from '@mantine/core';

export default function Layout({children}) {
  return (
    <>
      <Header height="auto" sx={theme => ({backgroundColor: theme.colors.gray[0]})}>
        <Group style={{height: '100%'}} p={20} position="apart" align={"center"}>
          <h1 style={{margin: 0}}>
            BébéCalculs
          </h1>
          <span style={{margin: 0}}>
            Calcul des prix et quantités requises pour nourrir bébé avec la préparation commerciale.
          </span>
        </Group>
      </Header>

      <Container fluid px={20} py={30}>
        {children}
      </Container>
    </>
  );
}
