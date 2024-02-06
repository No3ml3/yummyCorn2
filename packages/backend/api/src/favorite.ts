import express from 'express';
import type { Request, Response } from 'express';

import { db } from '@app/backend-shared';

import checkAuthState from './middlewares/check-auth-state';

interface RequestWithUser extends Request {
  userId?: number;
  isloggedIn?: boolean;
}

const favoriteRouter = express.Router();

favoriteRouter.get(
  '/',
  checkAuthState,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;

    if (userId === undefined || !req.isloggedIn) {
      return res.json({ status: { ok: false, message: 'not connected' } });
    }

    try {
      const cocktail = await db
        .selectFrom('favorite')
        .innerJoin('cocktail', 'favorite.cocktail_id', 'cocktail.id')
        .select([
          'cocktail.id',
          'cocktail.name',
          'cocktail.image',
          'cocktail.ratings_average',
          'cocktail.total_degree',
        ])
        .where('favorite.user_id', '=', Number(userId))
        .orderBy('cocktail.name')
        .execute();

      if (!cocktail) {
        return res.status(404).send('Cocktail not found');
      }

      res.json({ cocktails: cocktail });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

favoriteRouter.post(
  '/toggle/:cocktailId',
  checkAuthState,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;
    const { cocktailId } = req.params;

    if (userId === undefined) {
      return res.json({ result: 'not connected' });
    }

    try {
      await db.transaction().execute(async (trx) => {
        const isInFavorite = await trx
          .selectFrom('favorite')
          .selectAll()
          .where('cocktail_id', '=', Number.parseInt(cocktailId))
          .where('user_id', '=', Number(userId))
          .executeTakeFirst();

        if (isInFavorite === undefined) {
          await trx
            .insertInto('favorite')
            .values({
              cocktail_id: Number.parseInt(cocktailId),
              user_id: Number(userId),
            })
            .executeTakeFirst();
          return res.json({ ok: true, message: 'add' });
        } else {
          await trx
            .deleteFrom('favorite')
            .where('cocktail_id', '=', Number.parseInt(cocktailId))
            .where('user_id', '=', Number(userId))
            .executeTakeFirst();
          return res.json({ ok: true, message: 'delete' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

export { favoriteRouter };
