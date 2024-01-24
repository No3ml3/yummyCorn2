import express from 'express';
import type { Request, Response } from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { UpdateData } from '@app/types';
import type { ActionTable, Flavour } from '@app/types';

import loginIdUser from './middlewares/login-id-user';
import multerConfig from './middlewares/multer-config';
import validateCocktailAdd from './middlewares/validate-cocktail-add';

const cocktailRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
}

interface initialData {
  totalQuantity: number;
  totalkcal: number;
  totalComplexity: number;
  totalDuration: number;
  quantity: number[];
  kcal: number[];
  complexity: number[];
  duration: number[];
  flavors: Flavour[];
  counts: { [key in Flavour]: number };
  maxCount: number;
  maxItems: Flavour[];
}

interface allIngredient {
  quantity: number;
  flavour: Flavour;
  kcal: number;
}

cocktailRouter.post(
  '/add',
  loginIdUser,
  validateCocktailAdd,
  async (req: RequestWithUser, res: Response) => {
    const { name, glass, ingredients, alcohol, topping } = req.body;
    const userId = req.userId;

    if (userId === undefined) {
      return res.json({ ok: false, message: 'not connected' });
    }
    const random = Math.random();
    let howMuchMoreIngredients = 0;

    if (random <= 0.4) {
      howMuchMoreIngredients = 0;
    } else if (random > 0.4 && random <= 0.6) {
      howMuchMoreIngredients = 1;
    } else if (random > 0.6 && random <= 0.8) {
      howMuchMoreIngredients = 2;
    } else if (random > 0.8 && random <= 0.9) {
      howMuchMoreIngredients = 3;
    } else {
      howMuchMoreIngredients = 4;
    }

    const createdAt = new Date();

    const verb: ActionTable['verb'][] = [
      'muddle',
      'stir',
      'shake',
      'strain',
      'build',
      'mix',
      'pour',
      'garnish',
      'twist',
      'spritz',
      'layer',
      'float',
      'rim',
      'ignite',
      'blend',
      'top',
      'chill',
      'heat',
      'smoke',
      'double strain',
      'express',
      'infuse',
      'dissolve',
      'whip',
      'squeeze',
      'roll',
      'dash',
      'steam',
      'blast chill',
      'carbonate',
      'mist',
      'stir-fry',
    ];

    try {
      const shaker = await db.transaction().execute(async (trx) => {
        const ingredientsByIngredient = await db
          .selectFrom('ingredient')
          .select([
            'ingredient.id',
            'ingredient.name',
            'ingredient.flavour',
            'ingredient.flavour',
            'ingredient.degree',
            'ingredient.kcal',
          ])
          .innerJoin(
            'action_ingredient',
            'ingredient.id',
            'action_ingredient.ingredient_id',
          )
          .innerJoin('action', 'action_ingredient.action_id', 'action.id')
          .innerJoin('recipe', 'action.id', 'recipe.action_id')
          .where(
            'recipe.cocktail_id',
            'in',
            db
              .selectFrom('recipe')
              .select('cocktail_id')
              .innerJoin('action', 'recipe.action_id', 'action.id')
              .innerJoin(
                'action_ingredient',
                'action.id',
                'action_ingredient.action_id',
              )
              .where((eb) =>
                eb.or([
                  eb('action_ingredient.ingredient_id', '=', ingredients[0].id),
                  eb('action_ingredient.ingredient_id', '=', ingredients[1].id),
                  eb('action_ingredient.ingredient_id', '=', ingredients[2].id),
                ]),
              ),
          )
          .where('ingredient.id', 'not in', [
            ingredients[0].id,
            ingredients[1].id,
            ingredients[2].id,
          ])
          .groupBy('ingredient.id')
          .orderBy(sql`COUNT(ingredient.id)`, 'desc')
          .limit(howMuchMoreIngredients)
          .execute();

        const ingredient = await db
          .selectFrom('ingredient')
          .select([
            'ingredient.id',
            'ingredient.name',
            'ingredient.flavour',
            'ingredient.flavour',
            'ingredient.degree',
            'ingredient.kcal',
          ])
          .where('ingredient.id', 'not in', [
            ingredients[0],
            ingredients[1],
            ingredients[2],
          ])
          .orderBy(sql`rand()`)
          .limit(howMuchMoreIngredients - ingredientsByIngredient.length)
          .execute();

        const moreIngredientArray = [...ingredientsByIngredient, ...ingredient];

        const allIngredients = [
          ...ingredients,
          alcohol,
          ...moreIngredientArray,
        ];

        const initialData: initialData = {
          totalQuantity: 0,
          totalkcal: 0,
          totalComplexity: 0,
          totalDuration: 0,
          quantity: [],
          kcal: [],
          complexity: [],
          duration: [],
          flavors: [],
          counts: {
            fruity: 0,
            spicy: 0,
            herbaceous: 0,
            floral: 0,
            woody: 0,
            bitter: 0,
            sweet: 0,
            salty: 0,
            sour: 0,
            neutral: 0,
          },
          maxCount: 0,
          maxItems: [],
        };

        // eslint-disable-next-line unicorn/no-array-reduce
        const data = allIngredients.reduce(
          (acc: initialData, allIngredient: allIngredient) => {
            const numberQuantity = Math.floor(Math.random() * 10 + 1);
            const numberComplexity = Math.floor(Math.random() * 10 + 1);
            const numberDuration = Math.floor(Math.random() * 10 + 1);
            acc.totalQuantity += numberQuantity;
            acc.totalComplexity += numberComplexity;
            acc.totalDuration += allIngredient.kcal;
            acc.totalkcal += numberDuration;
            acc.quantity.push(numberQuantity);
            acc.complexity.push(numberComplexity);
            acc.duration.push(numberDuration);
            acc.kcal.push(allIngredient.kcal);
            acc.flavors.push(allIngredient.flavour);

            // Update counts, maxCount, and maxItems
            acc.counts[allIngredient.flavour] =
              (acc.counts[allIngredient.flavour] || 0) + 1;
            if (acc.counts[allIngredient.flavour] > acc.maxCount) {
              acc.maxCount = acc.counts[allIngredient.flavour];
              acc.maxItems = [allIngredient.flavour];
            } else if (acc.counts[allIngredient.flavour] === acc.maxCount) {
              acc.maxItems.push(allIngredient.flavour);
            }

            return acc;
          },
          initialData,
        );

        const finalFlavour: Flavour =
          data.maxItems[Math.floor(Math.random() * data.maxItems.length)];

        const cocktail = await trx
          .insertInto('cocktail')
          .values({
            name: name,
            glass_id: glass.id,
            total_degree: 23,
            total_kcal: initialData.totalkcal,
            created_at: createdAt,
            author: userId,
            final_flavour: finalFlavour,
            total_quantity: initialData.totalQuantity,
          })
          .executeTakeFirstOrThrow();

        const cocktailId = cocktail.insertId;

        if (cocktailId === undefined) {
          return res.status(404).send('Cocktail not found');
        }

        let index = 0;
        for (const ingredient of allIngredients) {
          const randomVerb = verb[Math.floor(Math.random() * verb.length)];

          const tools = await sql`
            SELECT tool_id, COUNT(*) as frequency
            FROM action
            WHERE verb = ${randomVerb}
            GROUP BY tool_id
            ORDER BY frequency DESC
            LIMIT 1
          `.execute(trx);

          const toolId =
            tools.rows.length > 0
              ? (tools.rows[0] as { tool_id: number }).tool_id
              : Math.random() * 10;

          const action = await trx
            .insertInto('action')
            .values({
              verb: randomVerb,
              priority: Math.floor(Math.random() * 10),
              tool_id: toolId,
              duration: initialData.duration[index],
              complexity: initialData.complexity[index],
              is_mandatory: [true, false][Math.floor(Math.random() * 2)],
            })
            .executeTakeFirstOrThrow();

          const actionId = action.insertId;

          if (actionId === undefined) {
            return res.status(404).send('action not found');
          }

          await trx
            .insertInto('action_ingredient')
            .values({
              ingredient_id: ingredient.id,
              action_id: Number(actionId),
              quantity: initialData.quantity[index],
            })
            .executeTakeFirstOrThrow();

          await trx
            .insertInto('recipe')
            .values({
              cocktail_id: Number(cocktailId),
              action_id: Number(actionId),
              total_complexity: initialData.totalComplexity,
              total_duration: initialData.totalDuration,
              step: 1,
            })
            .executeTakeFirstOrThrow();

          index++;
        }

        await trx
          .insertInto('cocktail_topping')
          .values({
            cocktail_id: Number(cocktailId),
            topping_id: topping.id,
            quantity: Math.floor(Math.random() * 10),
          })
          .executeTakeFirst();

        return res.json({ ok: true, cocktailId: Number(cocktailId) });
      });
      res.status(200).json({ cocktailId: Number(shaker) });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

// Route post pour uploader un fichier
cocktailRouter.post('/:id/upload', multerConfig, async (req, res) => {
  const cocktailId = Number.parseInt(req.params.id);
  const anecdote = req.body.anecdote === '' ? null : req.body.anecdote;
  const cocktailPicName = req.file ? req.file.filename : null;
  const updateData: UpdateData = {};

  if (anecdote !== null) {
    updateData.anecdote = anecdote;
  }
  if (cocktailPicName !== null) {
    updateData.image = cocktailPicName;
  }

  try {
    const result = await db
      .updateTable('cocktail')
      .set(updateData)
      .where('id', '=', cocktailId)
      .execute();
    res.send('Fichier uploadé avec succès!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les cocktails présents en BDD
cocktailRouter.get('/', async (req, res) => {
  try {
    const cocktails = await db.selectFrom('cocktail').selectAll().execute();
    res.json({ cocktails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

cocktailRouter.get('/alcohol', async (req, res) => {
  const ingredients = req.query.ingredients;
  const flavours = req.query.flavours;
  const kcals = req.query.kcals;
  const complexities = req.query.complexities;
  const degrees = req.query.degrees;
  const searchTerm = req.query.searchTerm;

  try {
    let query = db
      .selectFrom('cocktail')
      .innerJoin('recipe', 'recipe.cocktail_id', 'cocktail.id')
      .innerJoin('action', 'recipe.action_id', 'action.id')
      .innerJoin(
        'action_ingredient',
        'action.id',
        'action_ingredient.action_id',
      )
      .innerJoin(
        'ingredient',
        'action_ingredient.ingredient_id',
        'ingredient.id',
      )
      .select([
        'cocktail.id as cocktail_id',
        'cocktail.name as cocktail_name',
        'cocktail.image as cocktail_image',
        'cocktail.ratings_average as avg_rating',
        'cocktail.created_at as cocktail_created',
        'cocktail.final_flavour as cocktail_flavour',
        'cocktail.total_kcal as cocktail_kcal',
      ])
      .groupBy('cocktail.id')
      .orderBy('cocktail.name');

    if (searchTerm !== undefined) {
      query = query.where((eb) =>
        eb.or([
          eb('ingredient.name', 'like', `%${String(searchTerm)}%`),
          eb('cocktail.name', 'like', `%${String(searchTerm)}%`),
        ]),
      );
    }

    if (ingredients !== undefined) {
      const ingredientList: string[] = Array.isArray(ingredients)
        ? ingredients.map(String)
        : [String(ingredients)];

      const countDistinctIngredients = sql<string>`COUNT(DISTINCT ingredient.name)`;

      query = query
        .having(countDistinctIngredients, '=', sql`${ingredientList.length}`)
        .where('ingredient.name', 'in', ingredientList);
    }

    if (flavours !== undefined) {
      const flavourList: Flavour[] = (
        Array.isArray(flavours) ? flavours.map(String) : [String(flavours)]
      ) as Flavour[];

      const countDistinctFlavours = sql<string>`COUNT(DISTINCT cocktail.final_flavour)`;

      query = query
        .having(countDistinctFlavours, '=', sql`${flavourList.length}`)
        .where('cocktail.final_flavour', 'in', flavourList);
    }

    if (kcals !== undefined) {
      const kcalList: number[] = Array.isArray(kcals)
        ? kcals.map(Number)
        : [Number(kcals)];

      const countDistinctKcals = sql<string>`COUNT(DISTINCT cocktail.total_kcal)`;

      query = query
        .having(countDistinctKcals, '=', sql`${kcalList.length}`)
        .where('cocktail.total_kcal', 'in', kcalList);
    }

    if (complexities !== undefined) {
      const complexityList: number[] = Array.isArray(complexities)
        ? complexities.map(Number)
        : [Number(complexities)];

      const countDistinctComplexity = sql<string>`COUNT(DISTINCT recipe.total_complexity)`;

      query = query
        .having(countDistinctComplexity, '=', sql`${complexityList.length}`)
        .where('recipe.total_complexity', 'in', complexityList);
    }

    if (degrees !== undefined) {
      const degreeList: number[] = Array.isArray(degrees)
        ? degrees.map(Number)
        : [Number(degrees)];

      const countDistinctDegree = sql<string>`COUNT(DISTINCT cocktail.total_degree)`;

      query = query
        .having(countDistinctDegree, '=', sql`${degreeList.length}`)
        .where('cocktail.total_degree', 'in', degreeList);
    }

    const cocktailsFilter = await query.execute();
    res.json({ cocktails: cocktailsFilter });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les cocktails par id présents en BDD
cocktailRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const cocktail = await db
      .selectFrom('cocktail')
      .selectAll()
      .select((eb) => [
        'id',
        jsonArrayFrom(
          eb
            .selectFrom('recipe')
            .innerJoin('action', 'recipe.action_id', 'action.id')
            .innerJoin(
              'action_ingredient',
              'action.id',
              'action_ingredient.action_id',
            )
            .innerJoin(
              'ingredient',
              'action_ingredient.ingredient_id',
              'ingredient.id',
            )
            .select([
              'ingredient.id as ingredient_id',
              'ingredient.name as ingredient_name',
              'action_ingredient.quantity as quantity',
              'action.verb as verb',
              'action.priority as priority',
            ])
            .whereRef('recipe.cocktail_id', '=', 'cocktail.id'),
        ).as('ingredients'),

        jsonArrayFrom(
          eb
            .selectFrom('recipe')
            .innerJoin('action', 'recipe.action_id', 'action.id')
            .innerJoin('tool', 'action.tool_id', 'tool.id')
            .select([
              'tool.id as tool_id',
              'tool.name as tool_name',
              'tool.image as tool_image',
            ])
            .whereRef('recipe.cocktail_id', '=', 'cocktail.id'),
        ).as('tools'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail_topping')
            .innerJoin('topping', 'cocktail_topping.topping_id', 'topping.id')
            .select([
              'topping.id as topping_id',
              'topping.name as topping_name',
              'cocktail_topping.quantity as topping_quantity',
            ])
            .whereRef('cocktail_topping.cocktail_id', '=', 'cocktail.id'),
        ).as('toppings'),
      ])
      .where('cocktail.id', '=', Number.parseInt(id))
      .executeTakeFirst();

    if (!cocktail) {
      return res.status(404).send('Cocktail not found');
    }

    res.json({ cocktail });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Mettre à jour le champs anecdote grâce au formulaire
cocktailRouter.post('/:id', async (req, res) => {
  const id = req.params.id;
  const { anecdote } = req.body;

  try {
    await db
      .updateTable('cocktail')
      .set({
        anecdote: anecdote,
      })
      .where('id', '=', Number.parseInt(id))
      .execute();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { cocktailRouter };
